import ToggleSwitch from '../components/ui/custom-toggle'
import Button from '../components/ui/standard-button'
import IconButton from '../components/ui/icon-button'
import Navbar from '../components/ui/nav-bar'

function TemplatePage() {

  return (
    <>

      <Navbar route={'home'} isLoggedIn={true} buttons={['login', 'logout', 'dashboard', 'profile']}></Navbar >



      <div className='mt-24 mx-2 flex gap-2 bg-sky-100 p-6'>
        <ToggleSwitch className='flex-1' leftLabel='Anyone' rightLabel='Invite only' isChecked={false} size='sm' ></ToggleSwitch>
        <ToggleSwitch className='flex-1' leftLabel='Anyone' rightLabel='Invite only' isChecked={false} size='md' ></ToggleSwitch>
        <ToggleSwitch className='flex-1' leftLabel='Anyone' rightLabel='Invite only' isChecked={false} size='lg' ></ToggleSwitch>
      </div>

      <div className='m-6 mx-2 flex gap-2 bg-sky-100 p-6'>
        <Button size='xs' variant='default'>Login</Button>
        <Button size='sm' variant='default'>Login</Button>
        <Button size='md' variant='default'>Login</Button>
        <Button size='lg' variant='default'>Login</Button>
        <Button size='xs' variant='darker'>Login</Button>
        <Button size='sm' variant='darker'>Login</Button>
        <Button size='md' variant='darker'>Login</Button>
        <Button size='lg' variant='darker'>Login</Button>
        <Button size='xs' variant='danger'>Login</Button>
        <Button size='sm' variant='danger'>Login</Button>
        <Button size='md' variant='danger'>Login</Button>
        <Button size='lg' variant='danger'>Login</Button>
      </div>


      <div className='m-6 mx-2 flex gap-2 border border-sky-100 p-6'>
        <Button size='xs' variant='light' icon='UserRoundPlus'>Share</Button>
        <Button size='sm' variant='light' icon='UserRoundPlus'>Share</Button>
        <Button size='md' variant='light' icon='UserRoundPlus'>Share</Button>
        <Button size='lg' variant='light' icon='UserRoundPlus'>Share</Button>
      </div>

      <div className='m-6 mx-2 flex gap-2 bg-sky-100 p-6'>
        <Button size='xs' variant='default' icon='Focus'>Login</Button>
        <Button size='sm' variant='default' icon='Focus'>Login</Button>
        <Button size='md' variant='default' icon='Focus'>Login</Button>
        <Button size='lg' variant='default' icon='Focus'>Login</Button>
        <Button size='xs' variant='default' icon='Google'>Login</Button>
        <Button size='sm' variant='default' icon='Google'>Login</Button>
        <Button size='md' variant='default' icon='Google'>Login</Button>
        <Button size='lg' variant='default' icon='Google'>Login</Button>
        <Button size='xs' variant='dark' icon='Google'>Login</Button>
        <Button size='sm' variant='dark' icon='Google'>Login</Button>
        <Button size='md' variant='dark' icon='Google'>Login</Button>
        <Button size='lg' variant='dark' icon='Google'>Login</Button>
      </div >


      <div className='m-6 mx-2 flex gap-2 bg-sky-100 p-6'>
        <IconButton size='xs' variant='default' icon='Focus'></IconButton>
        <IconButton size='sm' variant='default' icon='Focus'></IconButton>
        <IconButton size='md' variant='default' icon='Focus'></IconButton>
        <IconButton size='lg' variant='default' icon='Focus'></IconButton>
        <IconButton size='xs' variant='default' icon='Palette'></IconButton>
        <IconButton size='sm' variant='default' icon='Palette'></IconButton>
        <IconButton size='md' variant='default' icon='Palette'></IconButton>
        <IconButton size='lg' variant='default' icon='Palette'></IconButton>
        <IconButton size='xs' variant='default' icon='TableProperties'></IconButton>
        <IconButton size='sm' variant='default' icon='TableProperties'></IconButton>
        <IconButton size='md' variant='default' icon='TableProperties'></IconButton>
        <IconButton size='lg' variant='default' icon='TableProperties'></IconButton>
        <IconButton size='xs' variant='default' icon='ChevronUp'></IconButton>
        <IconButton size='sm' variant='default' icon='ChevronUp'></IconButton>
        <IconButton size='md' variant='default' icon='ChevronUp'></IconButton>
        <IconButton size='lg' variant='default' icon='ChevronUp'></IconButton>
        <IconButton size='xs' variant='dark' icon='ChevronUp'></IconButton>
        <IconButton size='sm' variant='dark' icon='ChevronUp'></IconButton>
        <IconButton size='md' variant='dark' icon='ChevronUp'></IconButton>
        <IconButton size='lg' variant='dark' icon='ChevronUp'></IconButton>
        <IconButton size='xs' variant='ghost' icon='ChevronUp'></IconButton>
        <IconButton size='sm' variant='ghost' icon='ChevronUp'></IconButton>
        <IconButton size='md' variant='ghost' icon='ChevronUp'></IconButton>
        <IconButton size='lg' variant='ghost' icon='ChevronUp'></IconButton>
      </div>

    </>
  )
}

export default TemplatePage 

