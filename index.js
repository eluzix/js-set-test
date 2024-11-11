function MySet() {
  return {
    get: (val) => this[val],
    set: (val) => this[val] = 1,
  }
}

class MyClassSet {
  get(val) {
    return this[val];
  }

  set(val) {
    this[val] = 1;
  }
}

// const crypto = require('crypto');
function generator1(slots) {
  return "" + Math.round(Math.random() * slots);
  // return Math.round(Math.random() * slots);
  return (Math.random() + 1).toString(36).substring(7);

  // return crypto.randomUUID();
}

function generator2(slots) {
  // return "m" + Math.round(Math.random() * slots);
  return Math.round(Math.random() * slots);
  // return (Math.random() + 1).toString(36).substring(7);

  // return crypto.randomUUID();
}

function setSearch(count, slots, generator) {
  const set = new Set();
  let hits = 0;
  let misses = 0;

  for (let i = 0; i < count; i++) {
    const num = generator(slots);
    if (set.has(num)) {
      hits += 1;
    } else {
      misses += 1;
      set.add(num);
    }
  }

  return [hits, misses];
}

function dictSearch(count, slots, generator) {
  const ar = {};
  let hits = 0;
  let misses = 0;

  for (let i = 0; i < count; i++) {
    const num = generator(slots);
    if (ar[num]) {
      hits += 1;
    } else {
      misses += 1;
      ar[num] = 1;
    }
  }

  return [hits, misses];
}

function dictSearch2(count, slots, generator) {
  const ar = new Map();
  let hits = 0;
  let misses = 0;

  for (let i = 0; i < count; i++) {
    const num = generator(slots);
    ;
    if (ar.get(num)) {
      hits += 1;
    } else {
      misses += 1;
      ar.set(num);
    }
  }

  return [hits, misses];
}

function mySetSearch(count, slots, generator) {
  const ar = MySet();
  let hits = 0;
  let misses = 0;

  for (let i = 0; i < count; i++) {
    const num = generator(slots);
    if (ar.get(num)) {
      hits += 1;
    } else {
      misses += 1;
      ar.set(num);
    }
  }

  return [hits, misses];
}

function myClassSetSearch(count, slots, generator) {
  const ar = new MyClassSet();
  let hits = 0;
  let misses = 0;

  for (let i = 0; i < count; i++) {
    const num = generator(slots);
    if (ar.get(num)) {
      hits += 1;
    } else {
      misses += 1;
      ar.set(num);
    }
  }

  return [hits, misses];
}

function test() {
  const count = 1000000;
  const slots = 100000;

  const allTests = [
    // { name: 'setSearch', f: setSearch, g: generator1, fastest: 100000 },
    // { name: 'dictSearch', f: dictSearch, g: generator1, fastest: 100000 },
    { name: 'setSearch - generator1', f: setSearch, g: generator1, fastest: 100000 },
    { name: 'setSearch - generator2', f: setSearch, g: generator2, fastest: 100000 },
    { name: 'dictSearch - generator1', f: dictSearch, g: generator1, fastest: 100000 },
    { name: 'dictSearch - generator2', f: dictSearch, g: generator2, fastest: 100000 },
    // { name: 'dictSearch2', f: dictSearch2, g: generator1, fastest: 100000 },
    // { name: 'myClassSetSearch', f: myClassSetSearch, g: generator1, fastest: 100000 },
  ];

  let fastest = 100000;

  while (true) {
    let sum = 0;
    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i];
      const tp1 = performance.now();
      const [hits, misses] = test.f(count, slots, test.g);
      const tm = performance.now() - tp1;

      if (tm < test.fastest) {
        test.fastest = tm;
      }
      sum += test.fastest;
    }

    if (sum < fastest) {
      fastest = sum;
      for (let i = 0; i < allTests.length; i++) {
        const test = allTests[i];
        console.log(`${test.name}: ${test.fastest}`);
      }

      console.log("\n");
    }
  }
}


test();
