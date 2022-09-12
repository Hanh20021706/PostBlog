
export interface PostType{
    id? : number,
    title : string,
    content: string,
    categories : string
    image :string,
    published?: boolean,
    userId?: number,
    views? : number
}
