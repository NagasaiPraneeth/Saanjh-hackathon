import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Form from '../Form';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Dropdown(props) {
  function handleEdit(){
    props.setEditPatients(!props.editPatients);
    props.setDeletePatients(false);
    console.log("edit d",props.editPatients)
    console.log("delete d",props.deletePatients)
  }
  function handleDelte(){
    props.setDeletePatients(!props.deletePatients);
    props.setEditPatients(false);
    console.log("edit d",props.editPatients)
    console.log("delete d",props.deletePatients)
  }
    const navigate=useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Manage patients
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem >
            {({ focus }) => (
              <a
              onClick={() => navigate("/form")}
                className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
              >
                Add Patient
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                onClick={handleEdit}
                className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
              >
                Edit Patient
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <a
                onClick={handleDelte}
                className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
              >
                Remove Patient
              </a>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
