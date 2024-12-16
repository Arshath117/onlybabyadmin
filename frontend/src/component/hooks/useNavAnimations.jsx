import { useSpring, config } from '@react-spring/web';

const useNavAnimations = (isHovered) => {
  const logoSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: config.gentle
  });

  const menuSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
    config: config.gentle
  });

  const logoutSpring = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    config: config.wobbly
  });

  const glowSpring = useSpring({
    from: { boxShadow: '0 0 0px rgba(59, 130, 246, 0)' },
    to: async (next) => {
      while (true) {
        await next({ boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' });
        await next({ boxShadow: '0 0 0px rgba(59, 130, 246, 0)' });
      }
    },
    config: { duration: 2000 }
  });

  return { logoSpring, menuSpring, logoutSpring, glowSpring };
};

export default useNavAnimations;