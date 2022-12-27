import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowRight,
  faHouse,
  faMobileButton,
  faArrowLeft,
  faShield,
  faBuilding,
  faBell,
  faBatteryQuarter,
  faMicrochip
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import styles from './SideBar.module.css';
import Link from 'next/link';

function callback(e) {
  console.log(e.target);
}

function SideBar() {
  const [admin, setAdmin] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.getElementById('sideBar').style.width = '14rem';
    } else {
      document.getElementById('sideBar').style.width = '5rem';
    }
  }, [active]);

  return (
    <div className="flex justify-center mt-3 ">
      <div id="sideBar" className={styles.bodySideBar}>
        <div className="flex flex-col items-center h-full w-full gap-4">
          <div className="flex justify-center items-center w-3/5 h-12 mt-4">
            <Link href="/">
              <button className="flex justify-center w-full h-full bg-transparent">
                <img src="/logoSideBar.svg" height={48} width={48}></img>
              </button>
            </Link>
          </div>
          <div className="group flex justify-center items-center w-3/5 h-12 mt-4">
            <div>
              <button
                className="hover:scale-125 duration-200 transition-property: w-full h-full bg-transparent text-white group-hover:text-black"
                onClick={() => setActive(!active)}
              >
                <FontAwesomeIcon
                  icon={active ? faArrowLeft : faArrowRight}
                  size="2xl"
                  className=""
                />
              </button>
              {active ? (
                ''
              ) : (
                <label className="absolute left-24 bg-ipt w-32 rounded-lg justify-center h-8 items-center hidden group-hover:flex">
                  Expandir
                </label>
              )}
            </div>
          </div>
          <Link href="/opcoes" className="">
            <div className="hover:scale-125 duration-200 group flex justify-center items-center w-3/5 h-12 mt-4 bg-ipt hover:bg-white rounded-2xl cursor-pointer ">
              <div>
                <button className="w-full h-full text-white hover:text-black  bg-transparent">
                  <FontAwesomeIcon icon={faHouse} size="xl" className='' />
                  {active ? (
                    <label className="ml-4 Montserrat">Home</label>
                  ) : (
                    ''
                  )}
                </button>
                {active ? (
                  ''
                ) : (
                  <label className="absolute left-24 bg-ipt w-32 rounded-lg justify-center h-8 items-center hidden group-hover:flex">
                    Home
                  </label>
                )}
              </div>
            </div>
          </Link>

          <Link href="/predios">
            <div className="hover:scale-125 duration-200 group flex justify-center items-center w-3/5 h-12 mt-4 bg-ipt hover:bg-white rounded-2xl cursor-pointer">
              <div>
                <button className="w-full h-full bg-transparent">
                  <FontAwesomeIcon icon={faBuilding} size="xl" className='text-white group-hover:text-black' />{' '}
                  {active ? (
                    <label className="Montserrat">Dispositivos</label>
                  ) : (
                    ''
                  )}
                </button>
                {active ? (
                  ''
                ) : (
                  <label className="absolute left-24 bg-ipt w-32 rounded-lg justify-center h-8 items-center hidden group-hover:flex transition duration-500">
                    Dispositivos
                  </label>
                )}
              </div>
            </div>
          </Link>
          <Link href="/notificacoes">
            {admin ? (
              <div className="hover:scale-125 duration-200 group flex justify-center items-center w-3/5 h-12 mt-4 bg-ipt hover:bg-white rounded-2xl transition cursor-pointer">
                <button className="w-full h-full bg-transparent text-white hover:text-black">
                  <FontAwesomeIcon icon={faBell} size="xl" />{' '}
                  {active ? (
                    <label className="ml-2 Montserrat">Notificações</label>
                  ) : (
                    ''
                  )}
                </button>
                {active ? (
                  ''
                ) : (
                  <label className="absolute left-24 bg-ipt w-32 rounded-lg justify-center h-8 items-center hidden group-hover:flex transition duration-500">
                    Notificações
                  </label>
                )}
              </div>
            ) : (
              ''
            )}
          </Link>

          <Link href="/bateria">
            {admin ? (
              <div className="hover:scale-125 duration-200 group flex justify-center items-center w-3/5 h-12 mt-4 bg-ipt hover:bg-white rounded-2xl transition cursor-pointer">
                <button className="w-full h-full bg-transparent text-white hover:text-black">
                  <FontAwesomeIcon icon={faBatteryQuarter} size="xl" />{' '}
                  {active ? (
                    <label className="ml-2 Montserrat">Bateria</label>
                  ) : (
                    ''
                  )}
                </button>
                {active ? (
                  ''
                ) : (
                  <label className="absolute left-24 bg-ipt w-32 rounded-lg justify-center h-8 items-center hidden group-hover:flex transition duration-500">
                    Bateria
                  </label>
                )}
              </div>
            ) : (
              ''
            )}
          </Link>


          <Link href="/dispositivos">
            <div className="hover:scale-125 duration-200 group flex justify-center items-center w-3/5 h-12 mt-4 bg-ipt hover:bg-white rounded-2xl transition cursor-pointer">
              <button className="w-full h-full bg-transparent text-white hover:text-black">
                <FontAwesomeIcon icon={faMicrochip} size="xl" />{' '}
                {active ? (
                  <label className="ml-2 Montserrat">Equipamentos</label>
                ) : (
                  ''
                )}
              </button>
              {active ? (
                ''
              ) : (
                <label className="absolute left-24 bg-ipt w-32 rounded-lg justify-center h-8 items-center hidden group-hover:flex transition duration-500">
                  Equipamentos
                </label>
              )}
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.bodySideBarMobile}>
        <div className="flex flex-row items-center h-full w-full gap-4">
          <div className="flex justify-center items-center h-3/4 w-12 ml-4">
            <Link href="/">
              <button className="flex justify-center w-full h-full bg-transparent">
                <img src="/logoSideBar.svg" height={48} width={48}></img>
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center h-3/4 w-12 ml-8 bg-ipt hover:bg-white rounded-2xl">
            <Link href="/opcoes">
              <button className="w-full h-full bg-transparent">
                <FontAwesomeIcon icon={faHouse} size="xl" />
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center h-3/4 w-12 bg-ipt hover:bg-white rounded-2xl">
            <Link href="/predios">
              <button className="w-full h-full bg-transparent">
                <FontAwesomeIcon icon={faBuilding} size="xl" />
              </button>
            </Link>
          </div>
          {admin ? (
            <div className="group flex justify-center items-center h-3/4 w-12 bg-ipt hover:bg-white rounded-2xl">
              <Link href="/notificacoes">
                <button className="w-full h-full bg-transparent">
                  <FontAwesomeIcon icon={faBell} size="xl" />
                </button>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
