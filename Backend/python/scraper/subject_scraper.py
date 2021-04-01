from bs4 import BeautifulSoup
import requests
import json
import time
from multiprocessing import Pool
 
def worker(index):
    
    url = index[1]
    link = url
    response = requests.get(url, timeout=10)
    content = BeautifulSoup(response.content, "html.parser")

    area = content.find(class_='coursearea')
    info = content.find(class_='ie-images')
    title_candiated = content.find_all('h1')

    id_candidate = link.split("https://handbook.uts.edu.au/subjects/")[1]
    course_id = id_candidate.split(".")[0];
    title = (title_candiated[0].text).replace(course_id, '')
    description = content.find_all('em')
    paragraphs = content.find_all('p')

    # Find the faculty 
    faculty_candidate = content.find(id="currentpage");
    faculty = '';

    for span in faculty_candidate:
        faculty = span.text

    ## Find Credit Points
    try:
        description[0].text.index('cp')
    except ValueError:
        credit = "Unknown"
    else:
        credit = description[0].text

    anti = []
    pre = []

    ## Find Pre and Anti Requisites 
    for em in description:

        try:
            em.text.index('Requisite(s):')
        except ValueError:
            pass
        else:
            pre_candidate = em.text.split()
            pre_candidate_clean = pre_candidate[1].strip();
            if (len(pre_candidate_clean ) > 4):
                pre.append(pre_candidate_clean);

        try:
            em.text.index('Anti-requisite(s)')
        except ValueError:
            pass
        else:
            anti_candidate = em.text.split()
            anti_candidate_clean = anti_candidate[1].strip();
            if (len(anti_candidate_clean ) > 4):
                anti.append(anti_candidate_clean);

    postgraduate = False;
    description = '';
    typical_availabilities = [];

    for p in paragraphs:

        if (p.text == 'Postgraduate'):
            postgraduate = True;

        if ('Spring session' in p.text):
            if "Spring" not in typical_availabilities:
                typical_availabilities.append("Spring");

        if ('Autumn session' in p.text):
            if "Autumn" not in typical_availabilities:
                typical_availabilities.append("Autumn");
        
        if ('Summer session' in p.text):
            if "Summer" not in typical_availabilities:
                typical_availabilities.append("Summer");

        if (len(p.text) > len(description)):
            bad_description = [
                "Using a modern browser that supports web standards ensures that the site's full visual experience is available.  Consider upgrading your browser if you are using an older technology",
                "Information to assist with determining the applicable fee type can be found at Understanding fees.",
                "Note: The requisite information presented in this subject description covers only academic requisites. Full details of all enforced rules, covering both academic and admission requisites, are available at access conditions and My Student Admin.",
                "© Copyright UTS - CRICOS Provider No: 00099F"
            ]
            if p.text not in bad_description:
                description = p.text;

    subject = {}
    
    try:
        # print("----------")
        # print(index)
        # print(filtered_ids[index])
        # print(faculty)
        # print(title)
        # print(credit)
        # print(anti)
        # print(pre)
        # print(typical_availabilities)
        # print("Postgraduate:", postgraduate)
        # print("Description:", description)
        # print("----------")
        # print()

        subject['course_name'] = title.strip()
        subject['credit_points'] = credit.strip()
        subject['faculty'] = faculty.strip();
        subject['postgraduate'] = postgraduate
        subject['pre-requisites'] = pre
        subject['anti-requisites'] = anti
        subject['description'] = description.strip()
        subject['link'] = link.strip()

        return subject

    except AttributeError:
        pass

if __name__=="__main__":
    
    print("Starting Scraper")
    t0 = time.time()

    all_subjects = {}

    def split_list(a_list):
        half = len(a_list)
        return a_list[:35]

    url = 'https://www.handbook.uts.edu.au/subjects/alpha.html'
    response = requests.get(url, timeout=10)
    content = BeautifulSoup(response.content, "html.parser")
    #.replace(filtered_ids[index], '')
    results = content.find(class_='ie-images')
    links = results.find_all('a')
    links3 = links
    filtered_ids = []
    filtered_links = []

    for link in links3:

        try:
            if (len(link['href']) > 16):
                filtered_ids.append(link.text)
                filtered_links.append(link['href'])
        except KeyError:
            pass

        
    pool_size = 12
    pool = Pool(pool_size)

    print(filtered_links)
    outputs = {}

    for index in enumerate(filtered_links):
        results_pool = pool.map(worker, [index]);
        outputs[filtered_ids[index[0]]] = results_pool[0]
    
    pool.close()
    pool.join()

    with open('uts_subjects.json', 'w', encoding='utf-8') as f:
         json.dump(outputs, f, ensure_ascii=False, indent=4)

    t1 = time.time()
    total_time = t1-t0;
    print("Finished Scraping after: ", total_time, "seconds")


