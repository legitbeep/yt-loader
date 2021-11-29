export const convertUrl = (url: string) => {
    let newUrlArray: Array<String>;

    if( url.includes("youtu.be") ){
        newUrlArray = url.split("https://youtu.be/")
        return `https://youtube.com/watch?v=${newUrlArray[1]}`
    } else if (url.includes("https://youtube.com/shorts/")){
            newUrlArray = url.split("https://youtube.com/shorts/");
            return `https://youtube.com/watch?v=${newUrlArray[1]}`;
    } else if (url.includes("https://youtube.com/watch?v")){
        return url;
    } else {
        return url;
        // throw err maybe
    }
}
