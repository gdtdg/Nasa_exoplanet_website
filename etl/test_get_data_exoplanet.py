import requests

url = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps&format=csv'
headers = {'Accept': 'application/json'}

response = requests.get(url, headers=headers)

with open('outputfile.csv', 'wb') as outf:
    outf.write(response.content)


if __name__ == "__main__":
    print("tarace")