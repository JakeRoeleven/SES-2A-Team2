from bs4 import BeautifulSoup
import requests

def split_list(a_list):
    half = len(a_list)//121
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
        

for link in filtered_links:

    url = link
    response = requests.get(url, timeout=10)
    content = BeautifulSoup(response.content, "html.parser")

    area = content.find(class_='coursearea')
    info = content.find(class_='ie-images')
    title = content.find_all('h1')
    description = content.find_all('em')

    try:
        description[0].text.index('cp')
    except ValueError:
        credit = "Unknown"
    else:
        credit = description[0].text

    anti = ''
    pre = ''

    for em in description:

        try:
            em.text.index('Requisite(s):')
        except ValueError:
            pass
        else:
            pre = em.text

        try:
            em.text.index('Anti-requisite(s)')
        except ValueError:
            pass
        else:
            anti = em.text



    try:
        print("----------")
        print(area.text)
        print(title[0].text)
        print(credit)
        print(anti)
        print(pre)
        print("----------")
        print()
    except AttributeError:
        print("Fail")
        print(title)


print(len(filtered_links))
print(len(filtered_ids))
print(filtered_ids)
print(filtered_links)