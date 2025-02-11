import Box from "@mui/material/Box";
import React, { CSSProperties, FC } from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { NavLink } from "react-router-dom";

// props타입을 인터페이스하나로 정의 type으로도 가능
// interface : 클래스나 Object의 타입을 정하는데 쓰인다
// type : 인터페이스에 비해 정의할수 있는 타입이 많다.
interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

// 메뉴를 눌렀을 때 화면을 바꾸기 위해 path가 필요
interface MenuItem {
  text: string;
  path: string;
  // MUI의 아이콘은 타입이 React컴포넌트취급
  icon: React.ComponentType;
}

// props로 넘어오는 매개변수의 타입정의
// 컴포넌트에도 타입정의를 할수가 있다. 아래처럼
// FC(의미: 펑션컴포넌트)<타입> => 일일이 props에 타입을 정하지 않아도 된다.
// export const SideBar: FC<SidebarProps> = ({
/**
 * 화면 왼쪽의 사이드바
 */
export const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}: SidebarProps) => {
  const menyItems: MenuItem[] = [
    { text: "Home", path: "/", icon: HomeIcon },
    { text: "Report", path: "/report", icon: EqualizerIcon },
  ];

  // 메뉴전체의 스타일타입 정의
  const baseLinkStyle: CSSProperties = {
    // a태그로 감쌌을 때 글자가 파란색이 되는것을 방지
    textDecoration: "none",
    // 부모태그의 색을 상속
    color: "inherit",
    display: "block",
  };

  // 선택한 페이지의 배경색을 정의
  // CSSProperties : css의 타입으로 자정하면 css속성의 후보들을 선택할수 있다.
  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  };

  // 사이드바의 내용을 표시
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menyItems.map((item, index) => (
          // React에서의 a링크와 같은 역할
          <NavLink
            key={index}
            to={item.path}
            // NavLink가 호출될때 스타일을 아래에서 정의
            style={({ isActive }) => {
              return {
                // ... <= object안의 속성들을 호출
                ...baseLinkStyle,
                // isActive가 true면 activeLinkStyle를 적용
                ...(isActive ? activeLinkStyle : {}),
              };
            }}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                {/* icon */}
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <item.icon />
                </ListItemIcon>
                {/* text */}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* 모바일용 */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        // 인라인으로 CSS를 적용중
        // style과 같은 속성으로 MUI에서 인라인으로 CSS를 적용하고싶으면
        // sx를 사용하면 된다.
        sx={{
          // xs: 0픽셀이상
          // sm: 600픽셀 이상
          // md: 900픽셀
          display: { xs: "block", md: "none" }, // <= 브레이크포인트
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* PC용 */}
      <Drawer
        variant="permanent"
        // sm 600, md 900
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {/* 드로워안에 표시되는 리스트 */}
        {drawer}
      </Drawer>
    </Box>
  );
};
