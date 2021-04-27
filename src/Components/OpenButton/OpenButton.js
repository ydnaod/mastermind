import './OpenButton.css';
import React, { Fragment } from 'react';
import { motion } from 'framer-motion'

function OpenButton({ submitGuess }) {

    const handleClick = () => {
        submitGuess();
    }

    return (
        <Fragment>
            <motion.div whileTap={{ scale: .9 }}
                whileHover={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                initial={{ scale: .3 }}
                className="button"
                onClick={handleClick}
                data-cy='OpenButton'>
                Guess
            </motion.div>
        </Fragment>
    );
}

export default OpenButton;