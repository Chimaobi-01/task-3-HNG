import { getSession, signOut, useSession } from "next-auth/react"
import Gallery from "@/components/Gallery"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { photos } from "@/components/pictures"
import Loading from "@/components/Loading"


export default function Home() {
  const { data: session, status } = useSession()
 console.log(status);

  const handleSignOut = () => {
    signOut()
  }
  
  if(status !== "authenticated"){
    return <Loading />
  }

  return (
    <div>
    <AuthorizeUser handleSignOut={handleSignOut} />
    </div>
  )
}

export function AuthorizeUser({ handleSignOut }) {
  const [selectedFilters, setSelectedFilters] = useState([])
  const [filteredItems, setFilteredItems] = useState(photos)

  


  const handleFilters = selectedCategory => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter(f => f !== selectedCategory)
      setSelectedFilters(filters)
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory])
    }
  }

  useEffect(() => {
    filterItems()
  }, [])
  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = photos.filter(photo => photo.tag === selectedCategory)
        return temp
      })
      setFilteredItems(tempItems.flat())
    } else {
      setFilteredItems([...photos])
    }
  }


  return (
    <div className="container-lg relative min-h-screen h-full">
      <div className="wrapper z-50">
      {
        [1,2,3,4,5,6,7,8,9,10,11,12,13,15,15].map(((n,i) => {
          return <div key={i} className={`bubble z-50 b-${n}`}><span className="dot"></span></div>
        }))
      }
      <div className="w-full h-full min-h-screen">
      <Header
        selectedFilters={selectedFilters}
        handleFilters={handleFilters}
        handleSignOut={handleSignOut} />
      <Gallery
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
      />
      </div>
      </div>
     


     


    </div>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}