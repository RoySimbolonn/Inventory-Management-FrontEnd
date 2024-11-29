export function createPiniaMiddleware() {
    return (context) => {
        context.store.$onAction(({ name, store, args, after, onError }) => {
            console.log(`Action "${name}" in store "${store.$id}" with args:`, args);

            // Proteksi berdasarkan user role
            const userRole = localStorage.getItem('role');
            const protectedActions = ['addItem', 'updateItem', 'deleteItem'];
            if (protectedActions.includes(name) && userRole !== 'ADMIN') {
                console.error(`Unauthorized action "${name}" attempted by role "${userRole}"`);
                throw new Error('Unauthorized');
            }

            after((result) => {
                console.log(
                    result !== undefined
                        ? `Action "${name}" in store "${store.$id}" returned: ${result}`
                        : `Action "${name}" in store "${store.$id}" completed without returning a result.`
                );
            });

            onError((error) => {
                console.error(`Action "${name}" in store "${store.$id}" failed with error:`, error);
                throw error;
            });
        });
    };
}
