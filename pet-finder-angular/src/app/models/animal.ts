export interface Animal {
    name: string,
    desc: string,
    contact: string,
    smlimg?: string,
    lrgimg?: string,
    details: {
        age: string,
        gender: string,
        size: string
    }
}