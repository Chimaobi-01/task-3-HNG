import { useState } from "react"
import { BiExpand, BiBell, BiSearch } from "react-icons/bi"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function Header({ handleSignOut, handleFilters, selectedFilters }) {
    const [search, setSearch] = useState('')
    const [logout, setLogout] = useState(false)
    const filters = ["popular", "top-rated"]

    return (
        <div>
            <nav className="flex items-center justify-between p-4 text-white">
                <form className="search-flex ">
                    <BiSearch className="search-icon" />
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="bg-transparent " />
                </form>

                <div className="flex items-center gap-4">
                    <BiExpand size={23} className="hidden sm:inline" />
                    <span className="relative hidden sm:inline"><BiBell size={27} /> <small className="text-[.6rem] bg-rose-500 text-white rounded-lg px-2 absolute top-0 left-2.5">52</small></span>
                    
                    <span onClick={() => setLogout(!logout)}
                     className="flex cursor-pointer items-center gap-3 px-2 relative font-semibold">
                        <img className="w-10 h-10 rounded-full" src="/image/john.png" alt="john"/>
                        <span className="hidden sm:inline">John&nbsp;Wick</span>
                        
                        <MdKeyboardArrowDown className="hidden sm:inline" />
                        {logout && <div className="flex rounded justify-center absolute top-10 w-full ">
                            <button  onClick={() => {
                                setLogout(false)
                                handleSignOut()
                                }}className="hover:bg-gray-300 text-white hover:text-rose-500 w-full rounded px-3 p-2 tracking-wide ">Logout</button>
                        </div>}
                    </span>
                </div>
            </nav>

            <div className="text-center pt-24 pb-8">
                <h1 className="text-5xl font-bold text-white mb-2">Photo Gallery</h1>
                <p className="text-gray-200 font-bold text-lg px-4">beautiful places to see in china beautiful places to see in china beautiful places to see in china</p>
                
                <ul className="flex items-center justify-center gap-4 mt-10">
                {filters.map((tag, i) => {
                    console.log(tag);
                    return <li key={i}
                    onClick={() => handleFilters(tag)}
                    className={`border border-gray-200 font-semibold text-gray-400 cursor-pointer px-4 p-1 rounded-2xl ${(selectedFilters.includes(tag))?`${tag === "top-rated"? 'bg-purple-900 text-white': 'bg-rose-900 text-white' }`:''}`}> {tag} </li>
                })}
                </ul>
            </div>
        </div>
    )
}
