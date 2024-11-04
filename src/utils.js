
export function shuffle(src) {
    const copy = [...src];
  
    const length = copy.length;
    for (let i = 0; i < length; i++) {
      const x = copy[i];
      const y = Math.floor(Math.random() * length);
      const z = copy[y];
      copy[i] = z;
      copy[y] = x;
    }
  
    if (typeof src === 'string') {
      return copy.join('');
    }
  
    return copy;
  }