export const trimText = (s: string, t:number) => {
    if(s.length <= t-3) return s;
    return s.substr(0,t-3) + "...";
}