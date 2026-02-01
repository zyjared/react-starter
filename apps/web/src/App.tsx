import { ScrollArea, ThemeProvider } from '@r/ui'
import { AuroraProgressLoading } from '@r/ui/components/loading/AuroraProgressLoading.tsx'

import { CarouselPreviewLoading } from '@r/ui/components/loading/CarouselPreviewLoading.js'
import { GraphLoading } from '@r/ui/components/loading/GraphLoading.tsx'
import { PhotonBeamLoading } from '@r/ui/components/loading/PhotonBeamLoading.tsx'
import { TextStoryboardLoading } from '@r/ui/components/loading/TextStoryboardLoading.tsx'
import { AppLayout } from './components/layout/AppLayout'
import './App.css'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppLayout>

        <ScrollArea className="relative max-h-screen">

          <div className="flex flex-col gap-2 p-4">

            {
              [
                CarouselPreviewLoading,
                TextStoryboardLoading,
                PhotonBeamLoading,
                AuroraProgressLoading,
                GraphLoading,
              ].map((Loading, idx) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={idx} className="relative flex gap-2 w-full">

                    {
                      Array.from({ length: Math.random() > 0.5 ? 2 : 1 })
                        // eslint-disable-next-line react/no-array-index-key
                        .map((_, idx) => <div key={idx} className="w-1/4 h-64 bg-muted rounded" />)
                    }

                    <div className="absolute left-2 top-2">
                      <Loading className="" />
                    </div>
                  </div>
                )
              })
            }

          </div>

        </ScrollArea>
      </AppLayout>
    </ThemeProvider>
  )
}
