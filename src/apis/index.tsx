import { GptVersion } from "@/app/constants";
import { useAccessStore } from "@/app/store/access";
import { MessageRole } from "@/types/chat";

const host = "http://14.103.246.14:8090";
// const host = "127.0.0.1:8090";


/**
 * Header 信息
 */
function getHeaders() {
    const accessState = useAccessStore.getState()

    const headers =  {
        Authorization:  accessState.token,
        'Content-Type': 'application/json;charset=utf-8'
    }

    return headers
}

/**
 * Role 角色获取接口
 */
export const getRoleList = () => {
    // 从 apiPost mock 接口获取
    // return fetch(`${host}/role/list`).then((res) =>
    //     res.json()
    // );

    // 从本地 json 文件获取
    return fetch(`/prompts.json`).then((res) => res.json());
};

/**
 * 流式应答接口
 * @param data
 */
export const completions = (data: {
    messages: {content: string; role: MessageRole}[],
    model: GptVersion
}) => {
    console.log("更新后的 session.config.gptVersion 值:", data);
    return fetch(`${host}/api/v1/chat/completions`, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
};

/**
 * 登录鉴权接口
 * @param token
 */
export const login = (token: string) => {
    const accessState = useAccessStore.getState()
    return fetch(`${host}/api/v1/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `code=${accessState.accessCode}`
    });
};


/**
 * 商品列表查询
 */
export const queryProductList = () => {
    return fetch(`${host}/api/v1/sale/query_product_list`, {
        method: "get",
        headers: getHeaders(),
    });
}

/**
 * 用户商品下单，获得支付地址 url
 */
export const createPayOrder = (productId: number) => {
    return fetch(`${host}/api/v1/sale/create_pay_order`, {
        method: "post",
        headers: {
            ...getHeaders(),
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        body: `productId=${productId}`
    });
}

/**
 * 查看用户信息
 */
