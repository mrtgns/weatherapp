import React, { useState } from 'react';
import { RevolvingDot } from 'react-loader-spinner'

const loading = (WrappedComponent ) => {
    return props => {
      
        const [loading, setLoading] = useState(false);
        return (
          <div className='loading'>
            {loading && (
              <RevolvingDot
                height="100"
                width="100"
                radius="6"
                color="#000"
                secondaryColor=''
                ariaLabel="revolving-dot-loading"
                wrapperStyle={{}}
                wrapperClass="weather-all"
                visible={true}
              />
            )}
            <WrappedComponent
              setLoading={setLoading}
              {...props}
            />
    
          </div>
        );
      };
}

export default loading;
