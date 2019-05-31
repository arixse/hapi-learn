const joi = require('joi')
const paginationDefine = {
    limit:joi.number().integer().min(1).default(10).description("每条页数"),
    page:joi.number().integer().min(1).default(1).description("页码数"),
    pagination:joi.boolean().description("是否开启分页，默认为true")
}

module.exports = {paginationDefine}