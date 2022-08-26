
import 'dotenv/config'

const { TZ, LG } = process.env


function getHoursAndGreet() {

  let hours = new Date().toLocaleTimeString(LG, { timeZone: TZ, timestyle: 'full', hourCycle: 'h24' })

  return (hours >= '05:00:00' && hours <= '12:00:00') ? 'Bom Dia'
    : (hours >= '12:00:00' && hours <= '18:00:00') ? 'Boa Tarde' : 'Boa Noite'

}

export { getHoursAndGreet }