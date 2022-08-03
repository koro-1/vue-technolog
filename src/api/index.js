import qs from 'qs'
import request from '../utils/request'

export function logout() {
    return request.get('http://localhost:8081/user/logout')
}
export function axiosTest() {
    return request.get('http://localhost:8081/user/test')
}
export function getUserList() {
    return request.get('http://localhost:8081/user/getUserList')
}
export function getUserList2() {
    return request.get('http://106.14.29.161:8081/order/getOrderList')
}
export function getUserList3() {
    return request.get('http://localhost:8081/comment/getCommentList')
}
export function deleteUserByID(id) {
    return request.get('http://localhost:8081/user/deleteUserByID?id=' + id)
}
export function updateUser(id, username) {
    return request.get('http://localhost:8081/user/updateUserByID?id=' + id + '&username=' + username)
}

export function getCommentList(pageNum, pageSize) {
    return request.get('http://localhost:8081/comment/getCommentList?pageNum=' + pageNum + '&pageSize=' + pageSize)
}
export function deleteCommentByID(id) {
    return request.get('http://localhost:8081/comment/deleteComment?id=' + id)
}

export function getRoleList(pageNum, pageSize) {
    return request.get('http://localhost:8081/role/getRoleList/' + pageNum + '/' + pageSize)
}
export function addRole(name) {
    let params = new FormData()
    params.append('name', name)
    return request.post('http://localhost:8081/role/addRole', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
export function updateRole(id, roleName) {
    return request.post('http://localhost:8081/role/updateRole', qs.stringify({
        id,
        roleName,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
    })
}
export function deleteRoleByID(id) {
    return request.get('http://localhost:8081/role/deleteRoleByID/' + id)
}
export function queryRoleList() {
    return request.get('http://localhost:8081/role/queryRoleList')
}
export function updateUserRole(userId, roleId) {
    return request.get('http://localhost:8081/userRole/updateUserRole?userId=' + userId + '&roleId=' + roleId)
}

export function getAlgoList(pageNum, pageSize) {
    return request.get('http://localhost:8081/algo/getAlgoList/' + pageNum + '/' + pageSize)
}
export function deleteAlgoByID(id) {
    return request.get('http://localhost:8081/algo/deleteAlgoByID/' + id)
}
export function addAlgo(name) {
    let params = new FormData()
    params.append('name', name)
    return request.post('http://localhost:8081/algo/addAlgo', params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export function addComment(content) {
    return request.get('http://localhost:8081/comment/addComment?user_id=1&content=' + content)
}
