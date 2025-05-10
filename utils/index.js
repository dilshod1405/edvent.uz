export function debounce(fn = () => {}, wait = 500) {
    let timer = null;
  
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        //   console.log(args);
          
        fn.apply(null, args);
      }, wait);
    };
  }
  