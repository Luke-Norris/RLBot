import sys
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
PATH = "/Users/lukenorris/Downloads/chromedriver"
profile = 'https://rocketleague.tracker.network/rocket-league/profile/'

#driver = webdriver.Chrome(PATH)
ones = '/mmr?playlist=10'
twos = '/mmr?playlist=11'
threes = '/mmr?playlist=13'
platforms = ['epic','steam']
def getRank(platform, name, playlist):

    s=Service("/Users/lukenorris/Downloads/chromedriver")
    options = Options()
    options = webdriver.ChromeOptions()
    options.add_argument("--disable-web-security") 
    options.add_argument("--disable-gpu")
    options.add_argument('--log-level=1')
    options.add_argument("--headless")
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
    options.add_argument('user-agent={user_agent}')
    driver = webdriver.Chrome(service=s, options=options)
    driver.get(profile+platform+'/'+name+playlist)
    delay = 3 # seconds

    try:
        myElem = WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/main/div[3]/div[3]/div[1]/div/div/div[1]/div[1]/div[1]/div')))
        rank_name = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/main/div[3]/div[3]/div[1]/div/div/div[1]/div[1]/div[2]/div[1]/div/div[1]').text
        rank_div = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/main/div[3]/div[3]/div[1]/div/div/div[1]/div[1]/div[2]/div[1]/div/div[2]').text
        mmr = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/main/div[3]/div[3]/div[1]/div/div/div[1]/div[1]/div[2]/div[2]/div[2]').text
        return rank_name, rank_div, mmr
    except TimeoutException:
        return "Please Make sure that there are no typos :)"

if (sys.argv[2] in platforms and sys.argv[3] in ['1s', '2s', '3s']):
    if sys.argv[3] == '3s':
        print(getRank(sys.argv[2], sys.argv[1], threes))
    elif sys.argv[3] == '2s':
        print(getRank(sys.argv[2], sys.argv[1], twos))
    elif sys.argv[3] == '1s':
        print(getRank(sys.argv[2], sys.argv[1], ones))
    else:
        print('Please use the correct commands')
sys.stdout.flush()