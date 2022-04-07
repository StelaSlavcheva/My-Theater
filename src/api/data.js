import * as api from './api.js';

const viewUrl = {
    catalog: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    details: '/data/theaters/',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Application specific requests

export async function getAllCatalog() {
        return api.get(viewUrl.catalog);
}
export async function create(theater) {
    return api.post(viewUrl.create, theater);
}
export async function getById(id) {
    return api.get(viewUrl.details + id);
}
export async function edit(id, theater) {
    return api.put(viewUrl.edit + id, theater);
}
export async function delETE(id) {
    return api.del(viewUrl.delete + id);
}
export async function getMyTheaters(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}