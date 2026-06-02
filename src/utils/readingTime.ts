/**
 * 根据字数估算阅读时间。
 * 假设中文平均阅读速度为 400 字/分钟。
 * 返回类似 "5 分钟" 的字符串。
 */
export function calculateReadingTime(content: string): string {
  const charsPerMinute = 400;
  // 去掉空白字符后计算字符数（中文不按单词按字数）
  const chars = content.replace(/\s/g, '').length;
  const minutes = Math.max(1, Math.ceil(chars / charsPerMinute));

  return `${minutes} 分钟`;
}
