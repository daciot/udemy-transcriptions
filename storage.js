
async function save(key, obj){
    return await browser.storage.local.set({[key]: obj})
}

async function get(key){
    return await browser.storage.local.get(key)
}

async function remove(key){
    return await browser.storage.local.remove(key)
}

const storage = { get, remove, save }

