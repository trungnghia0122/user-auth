"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

import { Chart } from "@/components/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

const UserPage = () => {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className='min-h-screen w-full pb-5 pt-10'>
      <nav className='px-4 md:px-8 lg:px-10 mt-4 pb-5 flex flex-col '>
        <div className='flex justify-between items-center gap-2'>
          <h1 className='text-3xl md:text-4xl font-bold flex justify-start items-center'>
            Dashboard
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='h-10 w-10 rounded-full bg-slate-200 border-none'
              >
                {user?.username?.[0].toUpperCase() || "G"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuLabel>
                <span className='font-bold'>{user?.username || "Guest"}</span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => router.push("/login")}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <span className='text-sm text-gray-500'>
          Welcome,{" "}
          <span className='font-bold'>{user?.username || "Guest"}</span>
        </span>
      </nav>

      <div className='px-4 md:px-8 lg:px-10 overflow-x-auto'>
        <Menubar className='w-fit min-w-[300px]'>
          <MenubarMenu>
            <MenubarTrigger className='text-sm '>Overview</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='text-sm '>Analytics</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='text-sm'>Reports</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='text-sm '>Notifications</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className='flex flex-wrap mt-5 px-2 md:px-6 lg:px-8'>
        <div className='flex flex-wrap w-full justify-center items-center gap-4'>
          <Card className='h-[160px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] bg-transparent'>
            <CardHeader>
              <CardTitle className='text-base font-normal'>
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className='text-2xl  font-bold'>$45,231.89</h2>
              <p className='text-xs  text-gray-500'>+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className='h-[160px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] bg-transparent'>
            <CardHeader>
              <CardTitle className='text-base  font-normal'>
                Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className='text-2xl font-bold'>+2350</h2>
              <p className='text-xs  text-gray-500'>+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card className='h-[160px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] bg-transparent'>
            <CardHeader>
              <CardTitle className='text-base  font-normal'>Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className='text-2xl font-bold'>+12,234</h2>
              <p className='text-xs  text-gray-500'>+19% from last month</p>
            </CardContent>
          </Card>
          <Card className='h-[160px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] bg-transparent'>
            <CardHeader>
              <CardTitle className='text-base  font-normal'>
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className='text-2xl  font-bold'>+573</h2>
              <p className='text-xs  text-gray-500'>+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        <Card className='w-full sm:mx-2 py-6 md:py-10 my-5 px-2 md:px-6 lg:px-10'>
          <Chart />
        </Card>
      </div>
    </div>
  )
}

export default UserPage
