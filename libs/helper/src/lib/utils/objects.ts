export const removeEmptyFieldsFromObject = (obj: Object) => {
  const cleared = { ...obj };
  Object.keys(cleared).forEach((key) => {
    // @ts-ignore
    const val = cleared[key];
    if (typeof val === 'undefined' || val === '' || val === null) {
      // @ts-ignore
      delete cleared[key];
    }
  });
  return cleared;
};

export const checkSendingFieldsEquality = (newObject: Object, prevObject: Object) => {
  let hasDifference = false;
  Object.keys(newObject).forEach((key) => {
    // @ts-ignore
    if (newObject[key] !== prevObject[key]) {
      hasDifference = true;
    }
  });
  return hasDifference;
}

