export default (time: string) => {
  const today = new Date()
  const timeDate = new Date(time)

  return (
    timeDate.getDate() == today.getDate() &&
    timeDate.getMonth() == today.getMonth() &&
    timeDate.getFullYear() == today.getFullYear()
  )
}
