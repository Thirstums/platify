import { getToken, logout } from "@/pages/api/auth/spotify-auth";
import { Navbar, Text, Dropdown, User, Button } from "@nextui-org/react";
import Image from 'next/image'
import styles from '@/styles/Navbar.module.scss'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/pages/api/spotify";

export default function Nav() {
  const router = useRouter();
  const isLoggedIn: any = getToken();
  const [currentUser, setData] = useState<any>(null);

  function handleLogout() {
    logout();
    console.log('successfully logged out')
    router.push('/login');
  }

  useEffect(() => {
    const getUserProfile = async () => {
      const data = await getCurrentUser();
      setData(data);
    }
    
    if(isLoggedIn) {
      getUserProfile();
    }
  }, [isLoggedIn, router]);

  return (
    <>
      {isLoggedIn ? (
        <Navbar className={styles.profileNav} isBordered variant="sticky">
          <Navbar.Brand
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
            <a
                href="https://github.com/Thirstums/platify/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/PlatifyLogo.png"
                  alt="Vercel Logo"
                  
                  width={50}
                  height={50}
                  priority
                /> Platify
            </a>
          </Navbar.Brand>
          <div>
          {currentUser ? (
            <Navbar.Content
              css={{
                "@xs": {
                  w: "12%",
                  jc: "flex-end",
                },
              }}
            >
              <Dropdown placement="bottom-right">
                <Dropdown.Trigger>
                  {currentUser!.images.length > 0 ? (
                    <User
                      bordered
                      as="button"
                      size="md"
                      name={currentUser!.display_name}
                      color="success"
                      src={currentUser!.images[0]!.url}
                    />
                  ): (
                    <User
                      bordered
                      as="button"
                      size="md"
                      name={currentUser!.display_name}
                      color="success"
                      text={currentUser!.display_name.charAt(0).toUpperCase()}
                    />
                  )}
                </Dropdown.Trigger>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  onAction={(actionKey) => {
                    if(actionKey === "logout") {
                      handleLogout();
                    }
                  }}
                  css={{}}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18", width: "$100"}}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="success" css={{ d: "flex" }}>
                      { currentUser!.email }
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
          ): (
            <button onClick={handleLogout} className={styles.logoutBtn}>Log out</button>
          )}
          </div>
        </Navbar>
      ) : (
        <div className={styles.nav}>
          <a
            href="https://github.com/Thirstums/platify/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/PlatifyLogo.png"
              alt="Vercel Logo"
              
              width={50}
              height={50}
              priority
            /> Platify
          </a>
        </div>
      )}
    </>
  );
}