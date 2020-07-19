// animal object with extra details
export interface Animal {
    id: string,
    name: string,
    desc: string,
    contact: string,
    lrgimg?: string,
    details: {
        age: string,
        gender: string,
        size: string
    }
}