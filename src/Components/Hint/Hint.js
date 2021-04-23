import './Hint.css';
import React, { Fragment } from 'react';
import { motion } from "framer-motion"

export function Hint({ sentence }) {
    return (
        <Fragment>
            <motion.h3
                animate={{ y: 0 }}
                initial={{ y: 50 }}>
                {sentence}
            </motion.h3>
        </Fragment>
    );
}
