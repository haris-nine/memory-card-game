import TM from '../assets/type-moon.svg'

function Header() {
  return (
    <>
      <header className="font-parewide flex items-center p-10 bg-[#3882f6] text-4xl">
        <span>A</span>
        <img src={TM} alt="TYPE-MOON" className="max-w-32" />
        <span className="p-2">-</span>
        <span>BASED MEMORY GAME.</span>
      </header>
    </>
  )
}

export default Header
