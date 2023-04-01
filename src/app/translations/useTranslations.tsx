import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Partner } from '../../../types/partners'
import { useDebounce } from 'use-debounce'

interface Props {
  partners: Partner[]
}

export const useTranslations = (props: Props) => {
  const { partners: initialPartners } = props
  const [partners, setPartners] = useState(initialPartners)

  const allCategories = Array.from(
    new Set(initialPartners.map((p) => p.category))
  )

  const partnersByCategory: { [category: string]: Partner[] } = {}
  partners.forEach(
    (p) =>
      (partnersByCategory[p.category] = [
        ...(partnersByCategory[p.category] ?? []),
        p,
      ])
  )
  const router = useRouter()

  const meta_title = 'Find an Integration'
  const meta_description = `Use your favorite tools with Supabase.`

  const [search, setSearch] = useState('')
  const [debouncedSearchTerm] = useDebounce(search, 300)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const searchPartners = async (): Promise<Partner[]> => {
      setIsSearching(true)

      /* let query = supabase
        .from<Partner>('partners')
        .select('*')
        .eq('approved', true)
        .order('category')
        .order('title')

      if (search.trim()) {
        query = query
          // @ts-ignore
          .textSearch('tsv', `${search.trim()}`, {
            type: 'websearch',
            config: 'english',
          })
      } */

      const query = {
        data: [
          {
            id: 1,
            slug: 'sample-partner',
            type: 'technology',
            category: 'sample category',
            developer: 'sample developer',
            title: 'Sample Partner',
            description: 'Sample description',
            logo: 'https://supabase.com/_next/image?url=https%3A%2F%2Fobuldanrptloktxcffvn.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fintegrations%2Fclerk%2Fclerk-icon.png&w=96&q=75',
            images: ['sample-image-1.png', 'sample-image-2.png'],
            overview: 'Sample overview',
            website: 'https://sample.com',
            docs: 'https://sample.com/docs',
            approved: true,
          },
        ],
      }

      const { data: partners } = await query

      return partners
    }

    if (search.trim() === '') {
      setIsSearching(false)
      setPartners(initialPartners)
      return
    }

    searchPartners().then((partners) => {
      if (partners) {
        setPartners(partners)
      }

      setIsSearching(false)
    })
  }, [debouncedSearchTerm, router])

  return {
    meta_title,
    meta_description,
    allCategories,
    partnersByCategory,
    search,
    setSearch,
    isSearching,
    partners,
  }
}
