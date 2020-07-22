export const throttle = function(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0,
    timer = null;
  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的this上下文
    let context = this;
    // 保留调用时传入的参数
    let args = arguments;
    // 记录本次触发回调的时间
    let now = +new Date();
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn() //fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn() //fn.apply(context, args);
    }
  };
};


export const setScroll = function(dom, type) {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let height = scrollTop + clientHeight / 2 + 200;
  let timer = setInterval(() => {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    let diff = height - scrollTop;
    let speed = Math.ceil(diff / 10);
    if (scrollTop >= height) {
      return clearInterval(timer);
    }
    document.documentElement.scrollTop = document.body.scrollTop =
      scrollTop + speed;
  }, 25);
};

// 时间戳 转换
function analysis(time) {
  // '2020-05-30 19:46' 转 ['2020', '05', '30', '19', '46']
  return time
    .toString()
    .replace(/-|\:|\/|\ /g, ",")
    .split(",");
}
export const dateFormat = function(date) {
  const monthArr = [
    "",
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ];
  const enMonthArr = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
  const enWeekArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let arr = analysis(date);
  let week = new Date(Date.parse(`${arr[0]}/${arr[1]}/${arr[2]}`)).getDay();
  return {
    year: arr[0],
    month: {
      cn: monthArr[+arr[1]],
      en: enMonthArr[+arr[1]],
      st: arr[1]
    },
    week: {
      cn: weekArr[week],
      en: enWeekArr[week]
    },
    day: arr[2],
    date: date
  };
};
