from hjhh import settings
import requests

def login(code):
    #调用code2Session 微信后台接口获取返回数据，通过format传参，上面已封装
    code_url = settings.code2Session.format(settings.AppId,settings.AppSecret,code)
    response = requests.get(code_url)
    json_response = response.json()
    if json_response.get("session_key"):
        return json_response
    else:
        return False
