function disemvowel(str) {
    let vowels = ["a","e","i","o","u"];
    //let newStr = "";
    for ( i = 0; i <= str.length; i += 1){
        for (j = 0; j <= vowels.length; j +=1){
          if (str.indexOf("vowels[j]") >=0 ){
          str.slice(i,1)
          }
        }  
    }
    return str;
}