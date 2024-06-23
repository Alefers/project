import {
  FC,
  memo,
  PropsWithChildren,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { ModalPortalInner, ModalPortalProps } from './modal-portal-inner';


const runningInstances = {
  count: 0,
};

export const portalActiveClass = 'portal-active';

const getContainer = (uniqId: string) => {
  const id = `portal${uniqId}`;
  let portal = document.getElementById(id);
  if (!portal) {
    portal = document.createElement('div');
    portal.setAttribute('id', id);
    document.body.appendChild(portal);
  }
  return portal;
};

const removePortalContainer = (uniqId: string) => {
  const portal = document.getElementById(`portal${uniqId}`);
  if (portal) {
    portal.remove();
  }
};

const ModalPortal: FC<PropsWithChildren<ModalPortalProps>> = (props) => {
  const uniqId = useId();
  const [portalBlock, setBlock] = useState<HTMLElement | undefined>();

  useEffect(() => {
    setBlock(getContainer(uniqId));

    return () => {
      removePortalContainer(uniqId);
    };
  }, [uniqId]);

  useLayoutEffect(() => {
    runningInstances.count += 1;
    if (runningInstances.count === 1) {
      document.body.classList.add(portalActiveClass);
    }
    return () => {
      removePortalContainer(uniqId);
      runningInstances.count -= 1;
      if (runningInstances.count <= 0) {
        document.body.classList.remove(portalActiveClass);
      }
    };
  }, []);

  return (
    <>
      {portalBlock && ReactDOM.createPortal(
        <ModalPortalInner
          {...props}
        />,
        portalBlock,
      )}
    </>
  );
};

const _ModalPortal = memo(ModalPortal);

export {
  _ModalPortal as ModalPortal,
};
