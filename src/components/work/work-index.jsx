'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

import Pagination from '@/components/common/pagination';

export default function WorkIndex({ page, orderBy, allWorks, totalCount, itemsPerPage, search = "" }) {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()

  const [ searchText, setSearchText ] = useState(search)
  const [ orderBySelect, setOrderBySelect ] = useState(orderBy ? orderBy : "title-asc")

  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage)
    params.set('orderBy', orderBySelect)
    if(search) {
      params.set('search', search)
    }
    router.push(`${pathname}?${params.toString()}`)
    router.refresh();
  }

  const doSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', 1)
    params.set('search', searchText)
    params.set('orderBy', orderBySelect)
    router.push(`${pathname}?${params.toString()}`)
    router.refresh();
  }

  const setOrder = (value) => {
    const params = new URLSearchParams(searchParams.toString())
    if(page) {
      params.set('page', page)
    }
    if(search) {
      params.set('search', search)
    }
    params.set('orderBy', value)
    router.push(`${pathname}?${params.toString()}`)
    router.refresh();
  }

  useEffect(() => {
    setOrderBySelect(orderBy)
  }, [orderBy])

  return (
    <div className="cardo-regular">
      <div>
        <div className="w-full mb-4 block lg:flex">
          <div className="mr-auto flex items-center">
            <div className="flex items-center">
              <div className="ml-2 text-xs border mr-2 px-2 py-1 rounded-md">
                <select value={orderBySelect} onChange={(e) => setOrder(e.target.value)} >
                  <option value="year-asc">Year (asc)</option>
                  <option value="year-desc">Year (desc)</option>
                </select>
              </div>
            </div>
            <form>
              <input type="text" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-[100px] lg:w-auto border rounded-md text-sm px-2 py-1 bg-white" placeholder="Table filter..." />
              <button onClick={() => doSearch()} className="ml-2 border rounded-md text-sm px-2 py-1 bg-white/30 cursor-pointer hover:bg-white/20">Filter</button>
            </form>
            <div className="text-xs ml-2">{totalCount} results</div>

          </div>
          <div className="ml-2 mt-2 lg:mt-0 lg:ml-auto flex">
            <Pagination currentPage={page} totalResults={totalCount} resultsPerPage={itemsPerPage} onPageChange={changePage} />
          </div>
        </div>
        <table className="w-full text-sm text-left table-fixed">
          <thead className="text-xs text-black uppercase">
            <tr>
              <th className="table-cell px-3 py-1">Title</th>
              <th className="w-[700px] hidden lg:table-cell px-3 py-1">Blurb</th>
              <th className="w-[20px] px-3 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {allWorks.map((work, i) => {
              return (
                <tr onClick={() => router.push(`/works/${work.id}`)} key={`work-${i}`} className={`${i%2 ? 'bg-white/30' : ''} hover:bg-white/20 cursor-pointer`}>
                  <td className="table-cell px-3 py-1 font-medium capitalize break-words">{work.title.toLowerCase()}</td>
                  <td className=" hidden lg:table-cell px-3 py-1 font-medium break-words">{work.blurb}</td>
                  <td>
                    <Link href={`/works/${work.id}`}>
                      <svg className="" width="15" height="15" viewBox="0 0 20 20" strokeWidth="0.5" stroke="#3b2d2b" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                      </svg>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

}
