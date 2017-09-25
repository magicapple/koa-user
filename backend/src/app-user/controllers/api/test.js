
/**
 * 获取商户列表
 */
exports.getShopList = async (ctx, next) => {

    // throw new GValidationError('XXXName', 'xxxField');

    ctx.body = [
        {
            shopName : '饿了吗线下体验店',
            shopDescription : '饿了吗线下体验店',
            shopPic : '/pic/xxx.jpg',
        },
        {
            shopName : '美团线下体验店',
            shopDescription : '美团线下体验店',
            shopPic : '/pic/xxx.jpg',
        },
        {
            shopName : '和记小厨',
            shopDescription : '和记小厨',
            shopPic : '/pic/xxx.jpg',
        }
    ]
}


/**
 * 发布商户信息
 */
exports.postNewShop = async (ctx, next) => {

    console.log(ctx.request.body)

    ctx.body = ctx.request.body
}




// 用户列表
exports.getUsers = async (ctx, next) => {

    ctx.body = [
        {
            id : 1,
            deptId : 1,
            phone : '13022117050',
            password : '12345678',
            passwordSalt : 'salt',
            createDate : '2017-01-01',
            createBy : 'hary',
            isAdmin : 1,
            isActive : 1
        },

        {
            id : 2,
            deptId : 1,
            phone : '13022117051',
            password : '12345678',
            passwordSalt : 'salt',
            createDate : '2017-01-01',
            createBy : 'hary',
            isAdmin : 1,
            isActive : 1
        },

        {
            id : 3,
            deptId : 1,
            phone : '13022117052',
            password : '12345678',
            passwordSalt : 'salt',
            createDate : '2017-01-01',
            createBy : 'hary',
            isAdmin : 1,
            isActive : 1
        }
    ]
}


// 事业部们列表
exports.getDepartments = async (ctx, next) => {

    ctx.body = [
        {
            id : 1,
            name : '管理部'
        },

        {
            id : 2,
            name : '金融产品事业部'
        }
    ]
}





// 业务团队列表
exports.getTeams = async (ctx, next) => {
    ctx.body = [
        {
            id : 1,  deptId : 2,  name : '赵善文团队'
        },
        {
            id : 2,  deptId : 2,  name : '张培栓团队'
        },
        {
            id : 3,  deptId : 2,  name : '魏靖团队'
        },
        {
            id : 4,  deptId : 2,  name : '卢昆团队'
        },
        {
            id : 5,  deptId : 2,  name : '赵悝团队'
        },
        {
            id : 6,  deptId : 2,  name : '余东升团队'
        },
        {
            id : 7,  deptId : 2,  name : '孔光明团队'
        },
        {
            id : 8,  deptId : 2,  name : '张超超团队'
        },
        {
            id : 9,  deptId : 2,  name : '宁夏自营分公司'
        },
        {
            id : 11,  deptId : 2,  name : '钢材金融分公司'
        },
        {
            id : 12,  deptId : 2,  name : '赵孟晓团队'
        },
        {
            id : 13,  deptId : 2,  name : '陈璐团队'
        },
        {
            id : 14,  deptId : 2,  name : '杨邓团队'
        },
        {
            id : 15,  deptId : 2,  name : '田雪冬团队'
        },
        {
            id : 16,  deptId : 2,  name : '冷链团队'
        }
    ]
}


// 外部客户: 上游、下游、贸易商, 运输方, 资金方, ccs账务公司

exports.getPartyList = async (ctx, next) => {
    ctx.body = [
        { id : 1,  custType : 1,  name : '江苏晋和电力燃料有限公司' , shortName : '晋和'},
        { id : 2,  custType : 1,  name : '那曲瑞昌煤炭运销有限公司' , shortName : '那曲'},
        { id : 3,  custType : 1,  name : '郑州嘉瑞供应链管理有限公司' , shortName : '嘉瑞'},
        { id : 4,  custType : 1,  name : '山西瑞茂通供应链有限公司' , shortName : '山瑞'},
        { id : 5,  custType : 1,  name : '宁夏瑞茂通供应链管理有限公司' , shortName : '宁夏瑞茂通'},
        { id : 6,  custType : 1,  name : '宁夏华运昌煤炭运销有限公司' , shortName : '华运昌'},
        { id : 7,  custType : 1,  name : '宁夏腾瑞达电力燃料有限公司' , shortName : '腾瑞达'},
        { id : 8,  custType : 1,  name : '陕西秦瑞丰煤炭运销有限公司' , shortName : '秦瑞丰'},
        { id : 9,  custType : 1,  name : '陕西吕通贸易有限公司' , shortName : '吕通'},

        { id : 11,  custType : 1,  name : '新疆瑞茂通煤炭供应链管理有限公司' , shortName : '新疆瑞茂通'},
        { id : 12,  custType : 1,  name : '浙江瑞茂通供应链管理有限公司' , shortName : '浙江瑞茂通'},
        { id : 13,  custType : 1,  name : '浙江和辉电力燃料有限公司' , shortName : '和辉'},
        { id : 14,  custType : 1,  name : '宣威瑞茂通商贸有限公司' , shortName : '宣威瑞茂通'},
        { id : 15,  custType : 1,  name : '江西瑞茂通供应链管理有限公司' , shortName : '江西瑞茂通'},
        { id : 16,  custType : 1,  name : '上海瑞易供应链管理有限公司' , shortName : '上海瑞易'},
        { id : 17,  custType : 1,  name : '深圳前海瑞茂通供应链平台服务有限公司' , shortName : '前海瑞茂通'},

        { id : 18,  custType : 2,  name : '中瑞财富' , shortName : '中瑞财富'},
        { id : 19,  custType : 2,  name : '中平金融' , shortName : '中平金融'},

    ]
}



exports.getOrderList = async (ctx, next) => {
    ctx.body = [
        { id : 1, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'},
        { id : 2, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'},
        { id : 3, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'},
        { id : 4, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'},
        { id : 5, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'},
        { id : 6, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'},
        { id : 7, deptId : 1, teamId: 2, creatorId: 1, ownerId: 1, mainAccounting: 1, line : '业务线-xxx', cargoType : 'COAL', upstreamId : '11', upstreamSettleMode : 'ONE_PAPER_SETTLE' , downstreamId : '10', downstreamSettleMode : 'ONE_PAPER_SETTLE', STATUS: 'UNCOMPLETED'}


    ]
}