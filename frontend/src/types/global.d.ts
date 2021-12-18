// 设置全局类型，主要为了解决类型声明时的异常报错
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>
