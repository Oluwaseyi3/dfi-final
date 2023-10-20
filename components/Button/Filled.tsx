
import { Button } from 'antd';
import styled from 'styled-components';

interface Props {
  disabled?: boolean;
}

const FilledButton = styled(Button)<Props>`
  background: ${(props) => props.disabled ? props.theme.spaceGrey : props.theme.primary + ' 0% 0% no-repeat padding-box'};
  border: ${(props) => '2px solid ' + (props.disabled ? props.theme.grey : props.theme.primary)} !important;
  color: ${(props) => props.disabled ? props.theme.grey : '#fff'} !important;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
`;

export default FilledButton;
