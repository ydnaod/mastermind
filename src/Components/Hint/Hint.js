import './Hint.css';
import React, { Fragment } from 'react';
import { motion } from "framer-motion"

export function Hint({ sentence }) {
    return (
        <Fragment>
            <motion.h4
                animate={{ y: 0 }}
                initial={{ y: 50 }}>
                {sentence}
            </motion.h4>
        </Fragment>
    );
}
