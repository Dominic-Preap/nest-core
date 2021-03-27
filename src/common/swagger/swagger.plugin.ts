// https://github.com/swagger-api/swagger-ui/issues/4158
export const operationsSorter = (a, b) => {
  const methodsOrder = ['get', 'post', 'put', 'delete', 'patch', 'options', 'trace'];
  let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));
  // Or if you want to sort the methods alphabetically (delete, get, head, options, ...):
  // var result = a.get("method").localeCompare(b.get("method"));

  if (result === 0) {
    result = a.get('path').localeCompare(b.get('path'));
  }

  return result;
};

// https://github.com/swagger-api/swagger-ui/issues/3876
export const CaseInsensitiveFilterPlugin = () => {
  return {
    fn: {
      opsFilter: (taggedOps, phrase) => {
        return taggedOps.filter(
          (tagObj, tag) => tag.toLowerCase().indexOf(phrase.toLowerCase()) !== -1
        );
      }
    }
  };
};

// https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/custom-layout.md
// https://reactjs.org/docs/react-without-jsx.html
export const CustomLayoutPlugin = (props: any) => {
  const { getComponent, React } = props;
  const BaseLayout = getComponent('BaseLayout', true);

  const styles = {
    root: {
      paddingTop: 60
    },
    header: {
      background: '#20232a',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100
    },
    wrapper: {
      maxWidth: 1430,
      margin: '0 auto',
      padding: '12px 0px 8px'
    },
    image: {
      height: 35
    }
  };
  const Image = props.React.createElement('img', {
    style: styles.image,
    src: 'https://docs.nestjs.com/assets/logo-small.svg'
  });
  const Wrapper = React.createElement('div', { style: styles.wrapper }, Image);
  const Header = React.createElement('div', { style: styles.header }, Wrapper);
  const CustomLayout = React.createElement(
    'div',
    { style: styles.root },
    React.createElement(() => Header, null),
    React.createElement(BaseLayout, { style: { paddingTop: 60 } })
  );

  return { components: { CustomLayout: () => CustomLayout } };
};
