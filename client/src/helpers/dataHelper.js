export const dataHelper = {

    isset :function(accessor) {
        try {
            // Note we're seeing if the returned value of our function is not
            // undefined or null
            return accessor !== null && typeof accessor !== 'undefined' && accessor !== ''
        } catch (e) {
            // And we're able to catch the Error it would normally throw for
            // referencing a property of undefined
            return false
        }
    }

}