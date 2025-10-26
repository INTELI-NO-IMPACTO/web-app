import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BiBookBookmark } from "react-icons/bi";
import { BiCategory } from "react-icons/bi";
import { BiDoorOpen } from "react-icons/bi";
import { BiChat } from "react-icons/bi";
import { BiUser } from "react-icons/bi";

export default function BottomNav() {
  return (
    <NavContainer>
      <NavItem to="/chat">
        <BiChat size={25} />
        <span>Chat</span>
      </NavItem>

      <NavItem to="/articles">
        <BiBookBookmark size={25} />
        <span>Artigos</span>
      </NavItem>

      <NavItem to="/">
        <BiCategory size={25} />
        <span>Início</span>
      </NavItem>

      <NavItem to="/profile">
        <BiUser size={25} />
        <span>Perfil</span>
      </NavItem>

      <NavItem to="/logout">
        <BiDoorOpen size={25} />
        <span>Sair</span>
      </NavItem>
    </NavContainer>
  );
}

/* ============================= */
/* ======= Styled Components ==== */
/* ============================= */

const NavContainer = styled.nav`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-around;

  z-index: 9999;
  padding: 0.5rem 1rem;

  @media (max-width: 480px) {
    width: 95%;
    height: 60px;
    border-radius: 12px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.icons};
  text-decoration: none;
  transition: all 0.2s ease;

  svg {
    color: ${({ theme }) => theme.colors.icons};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
