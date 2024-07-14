import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Paper } from '@mui/material'
import routes from '@/constants/routes'
import { useNavigate } from 'react-router-dom'

const menus = [
  {
    label: 'Recents',
    icon: <RestoreIcon />,
    route: routes.test1
  },
  {
    label: 'Favorites',
    icon: <FavoriteIcon />,
    route: routes.test2
  },
  {
    label: 'Nearby',
    icon: <LocationOnIcon />,
    route: routes.test3
  }
]

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(menus[0].route)
  const navigate = useNavigate()

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
          navigate(newValue)
        }}
      >
        {menus.map(item => (
          <BottomNavigationAction value={item.route} label={item.label} icon={item.icon} key={item.label} />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
