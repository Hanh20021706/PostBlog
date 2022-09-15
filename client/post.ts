import axios from "axios"

interface ApiPostType  {
    [key: string]: number | string;
 
}

export const getPostList = async (arrayItem :any) => {
    console.log('get post list' , arrayItem);
    
    const {data} = await axios.get(`/api/posts?page=${arrayItem.page}&title=${arrayItem.title}&categories=${arrayItem.categories}`);
    return {data
    }
}

