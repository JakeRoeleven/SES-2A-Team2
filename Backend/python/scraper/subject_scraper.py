from bs4 import BeautifulSoup
import requests
import json
import time

print("Starting Scraper")
t0 = time.time()

all_subjects = {}

def split_list(a_list):
    half = len(a_list)
    return a_list[:half]

url = 'https://www.handbook.uts.edu.au/subjects/alpha.html'
response = requests.get(url, timeout=10)
content = BeautifulSoup(response.content, "html.parser")

results = content.find(class_='ie-images')

links = results.find_all('a')
links3 = split_list(links)
filtered_ids = []
filtered_links = []

for link in links3:

    try:
        if (len(link['href']) > 16):
            filtered_ids.append(link.text)
            filtered_links.append(link['href'])
    except KeyError:
        pass
    
for index, link in enumerate(filtered_links):

    print(index, link)

    url = link
    response = requests.get(url, timeout=10)
    content = BeautifulSoup(response.content, "html.parser")
    area = content.find(class_='coursearea')
    info = content.find(class_='ie-images')
    title_candiated = content.find_all('h1')
    title = (title_candiated[0].text).replace(filtered_ids[index], '')
    description = content.find_all('em')
    paragraphs = content.find_all('p')

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
            pre.append(pre_candidate[1].strip())

        try:
            em.text.index('Anti-requisite(s)')
        except ValueError:
            pass
        else:
            anti_candidate = em.text.split()
            anti.append(anti_candidate[1].strip())

    postgraduate = False;
    description = '';

    for p in paragraphs:

        if (p.text == 'Postgraduate'):
            postgraduate = True;

        if (len(p.text) > len(description)):
            description = p.text
        
    subject = {}
    
    try:
        # print("----------")
        # print(index)
        # print(filtered_ids[index])
        # print(area.text)
        # print(title)
        # print(credit)
        # print(anti)
        # print(pre)
        # print("Postgraduate:", postgraduate)
        # print("Description:", description)
        # print("----------")
        # print()

        subject['course_name'] = title.strip()
        subject['credit_points'] = credit.strip()
        subject['postgraduate'] = postgraduate
        subject['pre-requisites'] = pre
        subject['anti-requisites'] = anti
        subject['description'] = description.strip()
        subject['link'] = link.strip()

        all_subjects[filtered_ids[index]] = subject

    except AttributeError:
        pass

with open('uts_subjects.json', 'w', encoding='utf-8') as f:
    json.dump(all_subjects, f, ensure_ascii=False, indent=4)

t1 = time.time()
total_time = t1-t0;
print("Finished Scraping after: ", total_time, "seconds")