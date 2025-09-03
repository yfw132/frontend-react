// 格式化日期
export const formatDate = (
  date: Date | string,
  format: string = "YYYY-MM-DD"
) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

// 深拷贝
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (typeof obj === "object") {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
};
