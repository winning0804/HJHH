import logging

logger = logging.getLogger('django')

ERROR_code = {
    0:'成功',
    1:'记录已存在',
    2:'没有查询到指定记录',
    3:'需要登录',
    4:'账号或密码无效',
    5:'登录过期',
}

#操作成功的默认回复
def default_response():
    return {
        'code': 0,
        'msg': 'success',
        'data': {}
    }